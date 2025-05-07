import { Settings, User } from 'lucide-react'; // Import lucide icons
import { Link } from 'react-router-dom'; // Import Link
import { Button } from '@/components/ui/button'; // Import Button

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-10 py-4 bg-card shadow-lg">
      <div className="flex items-center gap-8"> 
        <Link to="/" className="text-4xl font-bold tracking-tight hover:text-primary transition-colors">
          <h1>School Scout</h1>
        </Link>
        {/* Navigation Links */}
        <nav className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link to="/">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/schools">Schools</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/tasks">Tasks</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/news">News</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
        </nav>
      </div>

      <div className="flex gap-4 items-center">
        {/* TODO: Add functionality or routing links */}
        <button
          className="rounded-full p-2 hover:bg-accent"
          aria-label="Settings"
          onClick={() => console.log('Settings button clicked')}
        >
          <Settings className="w-6 h-6" />
        </button>
        <button
          className="rounded-full p-2 hover:bg-accent"
          aria-label="User Profile"
          onClick={() => console.log('User Profile button clicked')}
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
