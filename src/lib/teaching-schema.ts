import { z } from 'astro/zod';

const text = z.object({
  hu: z.string().trim().min(1),
  en: z.string().trim().min(1).optional(),
});
const id = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Use lowercase ASCII words separated by hyphens.',
  );
const httpsUrl = z
  .string()
  .url()
  .refine((value) => {
    if (!URL.canParse(value)) return false;
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  }, 'Use an HTTPS URL without embedded credentials.');

const material = z
  .object({
    id,
    title: text,
    description: text,
    type: z.enum(['pdf', 'python', 'html', 'latex', 'zip', 'github']),
    languages: z
      .array(z.enum(['hu', 'de', 'en']))
      .min(1)
      .refine(
        (items) => new Set(items).size === items.length,
        'Languages must be unique.',
      ),
    access: z.enum(['university', 'public']).default('university'),
    url: httpsUrl,
    sizeBytes: z.number().int().positive().max(5_000_000).optional(),
    updated: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((date) => {
        const value = new Date(`${date}T00:00:00Z`);
        return (
          !Number.isNaN(value.getTime()) &&
          value.toISOString().slice(0, 10) === date
        );
      }, 'Use a real calendar date.'),
    draft: z.boolean().default(false),
  })
  .superRefine((value, ctx) => {
    if (value.type !== 'github' && value.sizeBytes === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sizeBytes'],
        message: 'File size is required.',
      });
    }
    if (!URL.canParse(value.url)) return;
    const host = new URL(value.url).hostname;
    if (value.access === 'university' && !host.endsWith('.sharepoint.com')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['url'],
        message:
          'University materials must link to SharePoint. Permissions must also be checked in Microsoft 365.',
      });
    }
  });

export const courseSchema = z
  .object({
    slug: id,
    title: text,
    description: text,
    order: z.number().int().nonnegative().default(0),
    draft: z.boolean().default(true),
    sessions: z.array(
      z.object({
        id,
        title: text,
        description: text.optional(),
        order: z.number().int().nonnegative(),
        draft: z.boolean().default(false),
        materials: z.array(material).max(5),
      }),
    ),
  })
  .superRefine((course, ctx) => {
    const sessions = new Set<string>();
    const materials = new Set<string>();
    course.sessions.forEach((session, s) => {
      if (sessions.has(session.id))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['sessions', s, 'id'],
          message: 'Duplicate session ID.',
        });
      sessions.add(session.id);
      session.materials.forEach((item, m) => {
        if (
          !course.draft &&
          !session.draft &&
          !item.draft &&
          item.url.toLowerCase().includes('your-tenant.sharepoint.com')
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['sessions', s, 'materials', m, 'url'],
            message: 'Replace the template URL before publishing.',
          });
        }
        if (materials.has(item.id))
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['sessions', s, 'materials', m, 'id'],
            message: 'Material IDs must be unique within the course.',
          });
        materials.add(item.id);
      });
    });
  });

export type Course = z.infer<typeof courseSchema>;
