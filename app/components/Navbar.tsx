import Link from "next/link";

    export default function NavBarComponent() {
    return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-black">PWA App</div>

        <div className="flex space-x-6">
          <Link href="/account" className="text-gray-700 hover:text-indigo-600">
            Mon compte
          </Link>
          <Link href="/photo" className="text-gray-700 hover:text-indigo-600">
            Photos
          </Link>
          <Link href="/discussion" className="text-gray-700 hover:text-indigo-600">
            Conversation
          </Link>
        </div>
      </div>
    </nav>
    )
}