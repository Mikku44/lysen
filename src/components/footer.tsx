import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-gray-50 print:hidden">
        <div className="max-w-7xl w-full mx-auto py-2 text-sm flex justify-between">
            <div className="">Copyright 2025 © Lysen Khain.app</div>
            <div className="flex gap-2">
                <Link href="/terms-of-use">Terms of use</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
        </div>
    </footer>
  )
}
