import { useState, useCallback } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { ArchitectChat } from "@/components/ArchitectChat";
import { BlueprintPanel } from "@/components/blueprint/BlueprintPanel";
import { ChatMessage, PlanStatus, PlanData } from "@/types/plan";
import { toast } from "sonner";
import { MOCK_PLAN } from "@/data/mockPlan";

const Index = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<PlanStatus>("IDLE");
  const [plan, setPlan] = useState<PlanData | null>(null);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setStatus("ANALYZING");
    setPlan(null);

    try {
      // TODO: Implement actual plan generation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const generatedPlan = MOCK_PLAN;
      setStatus("GENERATED");
      setPlan(MOCK_PLAN);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've analyzed your request and generated a comprehensive engineering plan for "${content}". The plan includes ${generatedPlan.filesAffected.length} file changes across ${generatedPlan.executionSteps.length} execution steps. Risk level: ${generatedPlan.riskLevel}.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating plan:", error);
      setStatus("IDLE");

      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate plan";
      toast.error(errorMessage);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error while generating the plan: ${errorMessage}. Please try again.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <AppHeader plan={plan} />

      <div className="flex-1 flex min-h-0">
        <AppSidebar />

        <main className="flex-1 flex min-w-0">
          {/* Left Pane - Chat */}
          <div className="w-1/2 border-r border-border flex flex-col min-h-0">
            <ArchitectChat
              messages={messages}
              onSendMessage={handleSendMessage}
              isAnalyzing={status === "ANALYZING"}
            />
          </div>

          {/* Right Pane - Blueprint */}
          <div className="w-1/2 flex flex-col min-h-0 bg-card/30">
            <BlueprintPanel status={status} plan={plan} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
