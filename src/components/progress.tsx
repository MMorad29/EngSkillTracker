"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Progress() {
  interface ProgressData {
    technicalSkills: Record<string, Record<string, string[]>>;
    humanSkills: Record<string, Record<string, string[]>>;
  }

  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetch("/data/progress.json")
      .then((res) => res.json())
      .then((data) => setProgressData(data));
  }, []);

  return (
    <div className="p-6">
      <Label className="text-2xl font-bold mb-4">
        Graduate Program Progress
      </Label>

      {progressData ? (
        <div>
          <Label className="text-xl font-semibold mt-4">Technical Skills</Label>
          {Object.entries(progressData.technicalSkills).map(
            ([skill, weeks]) => (
              <Accordion type="single" collapsible key={skill}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Label className="text-lg font-medium">{skill}</Label>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(weeks).map(([week, tasks]) => (
                      <div key={week} className="pl-4 mt-2">
                        <h4 className="font-semibold">{week}</h4>
                        <ul className="list-disc pl-6">
                          {tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          )}

          <Label className="text-xl font-semibold mt-4">Human Skills</Label>
          {Object.entries(progressData.humanSkills).map(([skill, weeks]) => (
            <Accordion type="single" collapsible key={skill} className="mb-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Label className="text-lg font-medium">{skill}</Label>
                </AccordionTrigger>
                <AccordionContent>
                  {Object.entries(weeks).map(([week, tasks]) => (
                    <div key={week} className="pl-4 mt-2">
                      <h4 className="font-semibold">{week}</h4>
                      <ul className="list-disc pl-6">
                        {tasks.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      ) : (
        <p>Loading progress...</p>
      )}
    </div>
  );
}
