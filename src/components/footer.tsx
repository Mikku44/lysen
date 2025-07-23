import Link from "next/link";
import Template from "./Template";
import ReduxProvider from "./home/ReduxProvider";


export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-gray-50 print:hidden">
        <div className="max-w-7xl w-full mx-auto py-2 text-sm flex items-center justify-between">
            <div className="">Copyright 2025 © Lysen Khain.app</div>
            <div className="flex gap-2 items-center">
                <Link
                className="hover:underline"
                href="/terms-of-use">Terms of use & Privacy Policy</Link>

                <ReduxProvider>
                  <Template></Template>
                </ReduxProvider>
            </div>
        </div>
    </footer>
  )
}
