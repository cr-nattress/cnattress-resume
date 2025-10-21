import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-hero p-8">
      <Card className="max-w-2xl bg-white/10 backdrop-blur border-white/20">
        <CardHeader>
          <CardTitle className="text-5xl font-bold gradient-text">
            Chris Nattress
          </CardTitle>
          <CardDescription className="text-xl text-gray-300">
            Software Engineer & AI Architect
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Next.js 15 + TypeScript + Tailwind CSS + Shadcn/ui ✓
          </p>
          <div className="flex gap-4">
            <Button className="bg-deep-purple hover:bg-deep-purple-700">
              Get Started
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
