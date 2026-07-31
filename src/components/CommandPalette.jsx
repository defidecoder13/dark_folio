import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  FileText, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Copy, 
  Check, 
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Cmd + K / Ctrl + K Keyboard Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open palette
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('subham@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commandItems = [
    {
      id: 'work',
      title: 'Jump to Selected Projects',
      subtitle: 'View Medsathi Pharmacy Platform & Systems',
      category: 'NAVIGATION',
      icon: <Code2 className="w-4 h-4 text-indigo-400" />,
      action: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'about',
      title: 'Jump to About Section',
      subtitle: 'Engineering philosophy & craft narrative',
      category: 'NAVIGATION',
      icon: <Terminal className="w-4 h-4 text-purple-400" />,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'experience',
      title: 'Jump to Experience',
      subtitle: 'Medsathi Pharmacy Management Software',
      category: 'NAVIGATION',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'skills',
      title: 'Jump to Skills & Tooling',
      subtitle: 'React, Next.js 16, TypeScript, IndexedDB PWA',
      category: 'NAVIGATION',
      icon: <Terminal className="w-4 h-4 text-blue-400" />,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'resume',
      title: 'View & Download Resume',
      subtitle: 'Open SUBHAM SANTRA RESUME.pdf',
      category: 'ACTIONS',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.open('/resume.pdf', '_blank');
        onClose();
      }
    },
    {
      id: 'email',
      title: 'Copy Email Address',
      subtitle: 'subham@example.com',
      category: 'ACTIONS',
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />,
      action: handleCopyEmail
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com',
      category: 'SOCIALS',
      icon: <Github className="w-4 h-4 text-neutral-300" />,
      action: () => {
        window.open('https://github.com', '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com',
      category: 'SOCIALS',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open('https://linkedin.com', '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commandItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
        {/* Backdrop Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Command Modal Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl rounded-2xl bg-[#0c0c12] border border-neutral-800 shadow-2xl shadow-black overflow-hidden z-10 font-mono"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-neutral-800/80 gap-3">
            <Search className="w-4 h-4 text-neutral-500" />
            <input 
              type="text"
              placeholder="Type a command or search section..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Command List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full px-3.5 py-3 rounded-xl flex items-center justify-between hover:bg-neutral-900/90 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800/80 group-hover:border-neutral-700 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-neutral-200">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-light">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest">
                    {item.category}
                  </span>
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-neutral-500">
                No matching commands found
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-neutral-950 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-500">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">↑↓</kbd> navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">↵</kbd> select</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">ESC</kbd> close</span>
            </div>
            {copied && <span className="text-emerald-400 font-semibold">Email copied!</span>}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
