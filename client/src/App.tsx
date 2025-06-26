import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Lesson from "@/pages/lesson";
import ChaptersPage from "@/pages/chapters";
import ChapterLessonsPage from "@/pages/chapter-lessons";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chapters" component={ChaptersPage} />
      <Route path="/chapters/:chapterId" component={ChapterLessonsPage} />
      <Route path="/lesson/:id" component={Lesson} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
