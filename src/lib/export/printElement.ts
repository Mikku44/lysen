export function print(element: HTMLElement) {



    const printContent = element.innerHTML;
    const originalContent = window.document.body.innerHTML;
    window.document.body.innerHTML = printContent;
    window.print();
    window.document.body.innerHTML = originalContent;
}