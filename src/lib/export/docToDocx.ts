import HtmlToDocx, { DocumentOptions } from "html-to-docx";



interface IExDocxProps {
  html: string
  header?: string
  footer?: string
  options?: DocumentOptions 
}

export async function docToDocx({
  html,
  header = '',
  footer = '',
  options = {}
}: IExDocxProps) {
  return await HtmlToDocx(html, header, options, footer);
}
