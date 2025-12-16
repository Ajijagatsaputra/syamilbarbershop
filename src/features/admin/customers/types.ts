export type CustomerStatus = "active" | "inactive" | "prospect";

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  visits: number;
  totalSpent: number;
  lastVisit: string;

  status: CustomerStatus;
  createdAt: string;
};

export type CustomerModal = "create" | "view" | "edit" | "delete" | null;
