// worker.ts - Cloudflare Worker (V8 Edge Runtime)
import OpenAI from 'openai';

interface Env {
	OPENAI_API_KEY: string; // Cloudflare Dashboard-on vagy Wrangler-en keresztül beállított titkos kulcs
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Dinamikusan olvassuk be a kérés küldőjét, vagy engedélyezzük a localhost-ot
		const requestOrigin = request.headers.get('Origin') || '*';

		const corsHeaders = {
			'Access-Control-Allow-Origin': request.headers.get('Origin') || '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Access-Control-Max-Age': '86400',
		};
		// Explicit Preflight (OPTIONS) kezelés
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204, // No Content állapotkód a sikeres OPTIONS-höz
				headers: corsHeaders,
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
		}

		try {
			const { messages } = (await request.json()) as { messages: any[] };

			if (!messages || !Array.isArray(messages)) {
				return new Response('Invalid input: messages array is required', { status: 400, headers: corsHeaders });
			}

			// 2. OpenAI kliens inicializálása az edge környezetben lévő titkos kulccsal
			const openai = new OpenAI({
				apiKey: env.OPENAI_API_KEY,
			});

			// 3. A fix kontextus (System Prompt) definiálása
			const systemPrompt = {
				role: 'system',
				content: `Ön Agócs Norbert PhD hallgató és kutató hivatalos AI asszisztense. Az Ön feladata, hogy pontosan, professzionális, akadémiai hangnemben válaszoljon a látogatók Norbert szakmai hátterével, kutatásaival, oktatási tevékenységével és tanulmányaival kapcsolatos kérdéseire.

KONTEXTUS NORBERTRŐL:
- Tanulmányok: Jelenleg a BME Gépészmérnöki Karán PhD hallgató (2024-től), kutatási területe az AI és a szimulációk integrációja. MSc diplomáját Gépészeti modellezés szakon (2022-2024), BSc diplomáját Mechatronikai mérnökként szerezte a BME-n. Tanult a Karlsruhe Institute of Technology (KIT) egyetemen is.
- Közélet és Vezetés: Az Egyetemi Doktorandusz Képviselet (EDK) elnöke (2025-től). Korábban a Gépészkari Hallgatói Képviselet (BME GHK) elnöke (2022-2024), alelnöke és oktatási felelőse volt. A MŰGÉP Egyesület elnöke volt (2022-2024). Tagja a BME Szenátusának és az Egyetemi Doktori Tanácsnak.
- Kutatás: Mesterséges intelligenciával támogatott, adatvezérelt konstitív modellek fejlesztése hiperelasztikus és rugalmas-képlékeny anyagokra. Doktori Kiválósági Ösztöndíj Program (DKÖP-25) ösztöndíjasa.
- Oktatás: A BME-n oktatott tárgyak: Statika, Szilárdságtan, Végeselem módszer alapjai. Korábban Arduino workshopokat vezetett középiskolásoknak.
- Elismerések: Dékáni Dicséret (2025).

SZIGORÚ UTASÍTÁSOK ÉS KORLÁTOZÁSOK (GUARDRAILS):
1. Norbert nevében beszéljen (egyes szám első személyben, pl.: "Kutatásaim során...", "A BME-n oktatok..."), vagy mint az ő dedikált asszisztense, de szigorúan az ő nevében eljárva.
2. Kizárólag a fenti kontextus és Norbert szakmai élete alapján válaszoljon. Ha olyan kérdést kap, amely nem kapcsolódik Norbert személyéhez, kutatásaihoz, az egyetemhez vagy a gépészmérnökséghez, válaszolja pontosan a következőt: "Sajnálom, de csak Agócs Norbert szakmai tevékenységével, kutatásaival és önéletrajzával kapcsolatos kérdésekre tudok válaszolni."
3. Ne találjon ki adatokat. Ha valami nincs a kontextusban, finoman jelezze, hogy erről nincs részletes információja.
4. Mindig tartsa meg a tisztelettudó, mérnöki és tudományos precizitást.`,
			};

			// 4. OpenAI API hívás az optimális, költséghatékony és gyors gpt-4o-mini modellel
			const chatCompletion = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: [systemPrompt, ...messages],
				temperature: 0.3, // Alacsony kreativitás a pontos tényközlésért
				max_tokens: 450,
			});

			const reply = chatCompletion.choices[0].message;

			return new Response(JSON.stringify({ reply }), {
				status: 200,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		} catch (error: any) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
};
