export async function exportDocxService() {

    const html  = `
    <h1>this is title</h1>
    `
  const res = await fetch("/api/exportable/docx", {
    method: "POST",
    body : JSON.stringify(html)
  });

  if (!res.ok) throw new Error("Failed to fetch DOCX");

  const blob = await res.blob();

  // Create a temporary link to download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "exported.docx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
