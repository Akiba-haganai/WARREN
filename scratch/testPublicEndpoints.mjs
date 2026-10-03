import handlerSubject from "../api/public/subject.js";
import handlerSitemap from "../api/public/sitemap.js";
import handlerCram from "../api/public/cram.js";

// We can test each handler in node with mock request
async function test() {
  console.log("Testing handlers...");
  // Test cram 404 or page
  const reqCram = new Request("http://localhost/cram/nonexistent?slug=nonexistent");
  const resCram = await handlerCram(reqCram);
  console.log("/cram/:slug status:", resCram.status, "content-type:", resCram.headers.get("content-type"));

  // Test subject
  const reqSub = new Request("http://localhost/subjects/CS220?code=CS220");
  const resSub = await handlerSubject(reqSub);
  console.log("/subjects/CS220 status:", resSub.status, "content-type:", resSub.headers.get("content-type"));

  // Test sitemap
  const reqSite = new Request("http://localhost/sitemap.xml");
  const resSite = await handlerSitemap(reqSite);
  console.log("/sitemap.xml status:", resSite.status, "content-type:", resSite.headers.get("content-type"));
}
test().catch(console.error);
