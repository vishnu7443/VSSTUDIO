export interface InquiryFormData {
  // Step 1: Services & Description
  services: string[];
  description: string;
  
  // Step 2: Budget & Deadline
  budgetRange: string;
  idealDeadline: string;
  
  // Step 3: References & Files
  referenceLinks: string;
  files: { name: string; size: number; type: string }[];
  
  // Step 4: Contact Information & Honeypot
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  honeypot: string; // Must remain empty
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Web Design & Dev' | 'Brand Identity' | 'AI Automation';
  description: string;
  tags: string[];
  metrics?: string;
  isSample: boolean;
  year: string;
}
