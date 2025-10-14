import type React from "react";
import type { PageContentProps } from "../interfaces/navigation.interface";

export const PageContent: React.FC<PageContentProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto -mt-3">
        {/* Page Header */}
        <div className="mb-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </main>
  );
};
