import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import generate from "@retrogen/generate";
import { DateTime } from "luxon";

for await (const organization of ["expressjs", "pillarjs", "jshttp"]) {
	const now = DateTime.now();
	const then = now.minus({ days: 7 });

	const dates = {
		start: then.toISODate(),
		end: now.toISODate(),
	};

	const report = await generate(organization, dates);

	// write the data out to a file
	await writeFile(resolve(`./${organization}/${dates.start}.md`), report);
}
