import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Plus, Edit, Trash2 } from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      name: "Classic Haircut",
      price: "Rp 50.000",
      duration: "30 min",
      category: "Haircut",
      status: "active",
    },
    {
      id: 2,
      name: "Premium Haircut",
      price: "Rp 75.000",
      duration: "45 min",
      category: "Haircut",
      status: "active",
    },
    {
      id: 3,
      name: "Beard Grooming",
      price: "Rp 35.000",
      duration: "20 min",
      category: "Grooming",
      status: "active",
    },
    {
      id: 4,
      name: "Hair Coloring",
      price: "Rp 200.000",
      duration: "90 min",
      category: "Styling",
      status: "active",
    },
    {
      id: 5,
      name: "Kids Haircut",
      price: "Rp 40.000",
      duration: "25 min",
      category: "Haircut",
      status: "active",
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-4 lg:p-6 bg-card border-border/40">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
            <Scissors className="h-6 w-6 text-amber-500" />
            Services Management
          </h2>

          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* SERVICE GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-5 bg-gradient-to-br from-card to-muted/30 border-border/40 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Scissors className="h-6 w-6 text-white" />
                </div>

                <span className="px-2 py-1 bg-green-500/20 text-green-600 text-xs font-medium rounded-full">
                  {service.status}
                </span>
              </div>

              <h3 className="font-bold text-lg mb-2">{service.name}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-bold text-green-600">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{service.duration}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-600 text-xs rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border/40">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/20"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ServicesPage;
