import { readFile } from "node:fs/promises";
import type { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from "node:http";
import { createServer } from "node:http";
import { extname } from "node:path";

const server = createServer((req, res) => {
  const path = req.url === "/" ? "dist/index.html" : req.url!.replace(/^\/static\//, "dist/");

  serveFile(res, path).catch((error) => console.error(error));
});

const port = 3000;

server.listen(port, () => console.info(`Server running at http://localhost:${port}/`));

async function serveFile(
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
  path: string,
): Promise<void> {
  try {
    const data = await readFile(path);

    res.writeHead(200, getHeaders(getMimeType(path)));
    res.end(data);
  } catch (error) {
    console.error(error);

    res.writeHead(404, getHeaders("text/plain"));
    res.end("404 Not Found");
  }
}

function getHeaders(contentType: string): OutgoingHttpHeaders {
  return { "Cache-Control": "no-store", "Content-Type": contentType };
}

function getMimeType(path: string): string {
  switch (extname(path).toLowerCase()) {
    case ".css":
      return "text/css";
    case ".html":
      return "text/html";
    case ".js":
      return "text/javascript";
  }

  return "application/octet-stream";
}
