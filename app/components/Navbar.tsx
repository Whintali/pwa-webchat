    export default function NavBarComponent() {
    return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-black">PWA App</div>

        <div className="flex space-x-6">
          <a href="/account" className="text-gray-700 hover:text-indigo-600">
            Mon compte
          </a>
          <a href="/photo" className="text-gray-700 hover:text-indigo-600">
            Photos
          </a>
          <a href="/discussion" className="text-gray-700 hover:text-indigo-600">
            Conversation
          </a>
        </div>
      </div>
    </nav>
    )
}