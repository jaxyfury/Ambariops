
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@amberops/ui/components/ui/button';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const useTypewriter = (lines: (string | React.ReactNode)[], speed = 50, initialDelay = 500) => {
    const [displayedLines, setDisplayedLines] = useState<(string | React.ReactNode)[]>([]);

    useEffect(() => {
        setDisplayedLines([]);
        const timeouts: NodeJS.Timeout[] = [];

        const typeLine = (lineIndex: number) => {
            if (lineIndex >= lines.length) return;

            const line = lines[lineIndex];
            if (typeof line !== 'string') {
                setDisplayedLines(prev => [...prev, line]);
                typeLine(lineIndex + 1);
                return;
            }

            let charIndex = 0;
            const currentLine: (string | React.ReactNode)[] = [...displayedLines.slice(0, lineIndex), ''];
            setDisplayedLines(currentLine);

            const typeChar = () => {
                if (charIndex < line.length) {
                    currentLine[lineIndex] = line.substring(0, charIndex + 1);
                    setDisplayedLines([...currentLine]);
                    charIndex++;
                    timeouts.push(setTimeout(typeChar, speed));
                } else {
                    timeouts.push(setTimeout(() => typeLine(lineIndex + 1), speed * 5));
                }
            };
            typeChar();
        };

        timeouts.push(setTimeout(() => typeLine(0), initialDelay));

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [lines, speed, initialDelay]);

    return displayedLines;
};


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    console.error(error);
    const details = `Error: ${error.message}\n\nDigest: ${error.digest || 'N/A'}\n\nStack Trace:\n${error.stack || 'Not available'}`;
    setErrorDetails(details);
  }, [error]);

  const handleCopy = () => {
    navigator.clipboard.writeText(errorDetails);
    toast.success('Error details copied to clipboard!');
  };

  const terminalLines = [
      './run amberops-diagnostics --level=critical',
      <span key="line1" className="text-muted-foreground">Searching for system errors...</span>,
      <br key="br1" />,
      <span key="line2" className="text-destructive">FATAL ERROR: Unhandled exception caught.</span>,
      `Error Code: ${error.digest || 'UNKNOWN_500'}`,
      `Message: ${error.message}`,
      <br key="br2" />,
      'An unexpected error occurred. These are not the droids you are looking for.',
      'Please try again, or if the problem persists, view and copy the error details below.',
      <br key="br3" />,
  ];

  const displayedText = useTypewriter(terminalLines);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-mono">
       <div className="w-full max-w-4xl text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
                <AmberOpsLogo className="h-12 w-12" />
                <h1 className="font-headline text-3xl font-semibold text-foreground">AmberOps Console</h1>
            </div>
            
             <div className="text-left w-full mx-auto rounded-lg shadow-2xl bg-card border">
                <header className="bg-muted px-4 py-2 rounded-t-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <p className="text-center flex-grow text-sm text-muted-foreground">bash - amberops-error-log</p>
                </header>
                <section className="p-4 h-64 overflow-y-auto text-sm text-foreground">
                    {displayedText.map((line, index) => (
                        <div key={index}>
                            {typeof line === 'string' && index !== displayedText.length-1 && <span>$&nbsp;</span>}
                            {line}
                            {typeof line === 'string' && index === displayedText.length-1 && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />}
                        </div>
                    ))}
                </section>
            </div>

            <div className="flex gap-4 mt-8 justify-center">
                <Button onClick={() => reset()}>
                    Try again
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Go to Homepage</Link>
                </Button>
            </div>

            <div className="mt-8 text-left max-w-2xl mx-auto">
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>View Full Error Details</AccordionTrigger>
                        <AccordionContent>
                           <div className="relative rounded-md bg-muted p-4 border">
                             <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-2 top-2 h-7"
                                onClick={handleCopy}
                             >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Details
                             </Button>
                             <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-all">
                                <code>
                                    {errorDetails}
                                </code>
                             </pre>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
       </div>
    </div>
  )
}
