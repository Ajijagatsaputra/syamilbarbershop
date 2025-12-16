export type ServiceStatus = "active" | "inactive";

export type ServiceCategory = "Haircut" | "Grooming" | "Styling";

export type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
  category: ServiceCategory;
  status: ServiceStatus;
  createdAt: string;
};

export type ServiceModal = "create" | "view" | "edit" | "delete" | null;
