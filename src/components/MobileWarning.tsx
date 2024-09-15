import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MobileWarning() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Mobile Access Not Supported</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            We apologize, but this application is currently optimized for desktop use only. 
            Please access it from a desktop or laptop computer for the best experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}