export function print(element: HTMLElement) {



    var printContent = element.innerHTML;
    var originalContent = window.document.body.innerHTML;
    window.document.body.innerHTML = printContent;
    window.print();
    window.document.body.innerHTML = originalContent;
}