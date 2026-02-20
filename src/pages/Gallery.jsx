
import React, { useState, useEffect, useCallback } from "react";
import { PetPhoto, Transformation } from "@/entities/all";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Heart, Grid, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryList from "../components/gallery/GalleryList";
import TransformationModal from "../components/gallery/TransformationModal";

export default function GalleryPage() {
  const [transformations, setTransformations] = useState([]);
  const [petPhotos, setPetPhotos] = useState({});
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");

  const loadGalleryData = useCallback(async () => {
    setIsLoading(true);
    try {
      const allTransformations = await Transformation.list("-created_date");
      const filtered = filter === "all" 
        ? allTransformations 
        : allTransformations.filter(t => t.style === filter);
      setTransformations(filtered);

      const photoIds = [...new Set(filtered.map(t => t.pet_photo_id))];
      if (photoIds.length > 0) {
        const photos = await PetPhoto.filter({ id: { $in: photoIds } });
        const photosById = photos.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
        setPetPhotos(photosById);
      } else {
        setPetPhotos({});
      }
    } catch (error) {
      console.error("Error loading gallery:", error);
    }
    setIsLoading(false);
  }, [filter]); // filter is a dependency for useCallback

  useEffect(() => {
    loadGalleryData();
  }, [loadGalleryData]); // loadGalleryData is now a stable function reference due to useCallback

  if (transformations.length === 0 && !isLoading) {
    return (
      <div className="funky-card text-center p-12">
        <Heart className="w-16 h-16 mx-auto mb-4 text-pink-300" />
        <h3 className="header-font text-3xl text-gray-800 mb-2">Your Gallery is Empty</h3>
        <p className="body-font-light text-lg text-gray-600 mb-6">
          Upload your first pet photo to start creating magical artwork!
        </p>
        <Link to={createPageUrl("Upload")}>
          <Button className="funky-button bg-[var(--brand-orange)] text-white text-xl px-8 py-3">
            Upload Photo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Filters */}
      <div className="funky-card p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="header-font text-3xl md:text-4xl text-gray-800">Your Magical Gallery</h1>
          <p className="body-font-light text-gray-600">{transformations.length} creations</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="funky-button bg-white w-40 body-font-light text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="magical">Magical</SelectItem>
              <SelectItem value="royal">Royal</SelectItem>
              <SelectItem value="superhero">Superhero</SelectItem>
              <SelectItem value="fantastical">Fantastical</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
              <SelectItem value="funny">Funny</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex p-1 bg-gray-200 border-2 border-[var(--brand-purple)] rounded-2xl">
            <Button size="icon" onClick={() => setViewMode("grid")} className={`funky-button text-xl p-2 ${viewMode === 'grid' ? 'bg-[var(--brand-purple)] text-white' : 'bg-white'}`}><Grid /></Button>
            <Button size="icon" onClick={() => setViewMode("list")} className={`funky-button text-xl p-2 ${viewMode === 'list' ? 'bg-[var(--brand-purple)] text-white' : 'bg-white'}`}><List /></Button>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      {viewMode === "grid" ? (
        <GalleryGrid transformations={transformations} petPhotos={petPhotos} onSelect={setSelected} isLoading={isLoading} />
      ) : (
        <GalleryList transformations={transformations} petPhotos={petPhotos} onSelect={setSelected} isLoading={isLoading} />
      )}

      {/* Modal */}
      {selected && (
        <TransformationModal
          transformation={selected}
          petPhoto={petPhotos[selected.pet_photo_id]}
          isOpen={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
