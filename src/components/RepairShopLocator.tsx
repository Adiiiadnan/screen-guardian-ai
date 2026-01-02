import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Phone, Clock, Star, Filter, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RepairShop {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  specialties: string[];
  hours: string;
  distance: string;
  coordinates: [number, number];
  certified: boolean;
}

const mockRepairShops: RepairShop[] = [
  {
    id: 1,
    name: "TechFix Pro Center",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    rating: 4.8,
    specialties: ["Screen Cracks", "Dead Pixels", "LCD Replacement"],
    hours: "9 AM - 8 PM",
    distance: "0.5 mi",
    coordinates: [-74.006, 40.7128],
    certified: true,
  },
  {
    id: 2,
    name: "ScreenMasters",
    address: "456 Tech Avenue, Midtown",
    phone: "(555) 234-5678",
    rating: 4.6,
    specialties: ["Screen Cracks", "Touch Calibration"],
    hours: "10 AM - 7 PM",
    distance: "1.2 mi",
    coordinates: [-73.985, 40.748],
    certified: true,
  },
  {
    id: 3,
    name: "Mobile Rescue Hub",
    address: "789 Repair Lane, Uptown",
    phone: "(555) 345-6789",
    rating: 4.9,
    specialties: ["Dead Pixels", "OLED Burn-in", "Display Issues"],
    hours: "8 AM - 9 PM",
    distance: "1.8 mi",
    coordinates: [-73.968, 40.785],
    certified: true,
  },
  {
    id: 4,
    name: "QuickScreen Repairs",
    address: "321 Fix-It Blvd, East Side",
    phone: "(555) 456-7890",
    rating: 4.4,
    specialties: ["Screen Cracks", "Glass Replacement"],
    hours: "9 AM - 6 PM",
    distance: "2.1 mi",
    coordinates: [-73.95, 40.72],
    certified: false,
  },
  {
    id: 5,
    name: "DisplayDoctors",
    address: "654 Gadget Street, West End",
    phone: "(555) 567-8901",
    rating: 4.7,
    specialties: ["Dead Pixels", "Screen Cracks", "Backlight Issues"],
    hours: "10 AM - 8 PM",
    distance: "2.5 mi",
    coordinates: [-74.02, 40.735],
    certified: true,
  },
];

const damageTypes = [
  "All Types",
  "Screen Cracks",
  "Dead Pixels",
  "LCD Replacement",
  "OLED Burn-in",
  "Touch Calibration",
  "Backlight Issues",
];

const RepairShopLocator = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Types");
  const [selectedShop, setSelectedShop] = useState<RepairShop | null>(null);
  const [filteredShops, setFilteredShops] = useState(mockRepairShops);

  useEffect(() => {
    if (selectedFilter === "All Types") {
      setFilteredShops(mockRepairShops);
    } else {
      setFilteredShops(
        mockRepairShops.filter((shop) =>
          shop.specialties.includes(selectedFilter)
        )
      );
    }
  }, [selectedFilter]);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-73.99, 40.74],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      setIsMapLoaded(true);
      addMarkers();
    });
  };

  const addMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    filteredShops.forEach((shop) => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-foreground">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;

      el.addEventListener("click", () => {
        setSelectedShop(shop);
        map.current?.flyTo({
          center: shop.coordinates,
          zoom: 15,
        });
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat(shop.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (isMapLoaded) {
      addMarkers();
    }
  }, [filteredShops, isMapLoaded]);

  const handleShopClick = (shop: RepairShop) => {
    setSelectedShop(shop);
    if (map.current) {
      map.current.flyTo({
        center: shop.coordinates,
        zoom: 15,
      });
    }
  };

  return (
    <section id="repair-locator" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Find Repair Centers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Locate certified repair shops near you specialized in your specific
            damage type.
          </p>
        </div>

        {!isMapLoaded && (
          <div className="glass-card p-6 rounded-2xl mb-8 max-w-md mx-auto">
            <label className="block text-sm font-medium mb-2 text-foreground">
              Enter your Mapbox Public Token
            </label>
            <p className="text-xs text-muted-foreground mb-4">
              Get your free token at{" "}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="pk.eyJ1..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={initializeMap} disabled={!mapboxToken}>
                Load Map
              </Button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Filter */}
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Filter by Damage</span>
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select damage type" />
                </SelectTrigger>
                <SelectContent>
                  {damageTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Shop List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredShops.map((shop) => (
                <div
                  key={shop.id}
                  onClick={() => handleShopClick(shop)}
                  className={`glass-card p-4 rounded-xl cursor-pointer transition-all hover:border-primary/30 ${
                    selectedShop?.id === shop.id
                      ? "border-primary/50 bg-primary/5"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">
                      {shop.name}
                    </h3>
                    {shop.certified && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary text-xs"
                      >
                        Certified
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{shop.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>{shop.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{shop.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{shop.rating} rating</span>
                      <span className="text-primary">• {shop.distance}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {shop.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden h-[600px] relative">
              {!isMapLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                  <div className="text-center">
                    <Navigation className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-muted-foreground">
                      Enter your Mapbox token to view the map
                    </p>
                  </div>
                </div>
              ) : null}
              <div ref={mapContainer} className="w-full h-full" />

              {/* Selected Shop Info Overlay */}
              {selectedShop && isMapLoaded && (
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {selectedShop.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedShop.address}
                      </p>
                    </div>
                    <Button size="sm" className="ml-4">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairShopLocator;
