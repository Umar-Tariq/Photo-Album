import { CloudinaryImage } from "../gallery/cloudinary-image";
import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/force-refresh";



export default async function FavouritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type: image AND tags=favourite" )
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
        <ForceRefresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">

          <h1 className="text-4xl font-bold">Favourite Images</h1>
          
        </div>
        <div className="grid grid-cols-4 gap-4">
          {results.resources.map((result) => (
            <CloudinaryImage
            path="/favourites"
              key={result.public_id}
              src={result.public_id}
              public_id={result.public_id}
              imageData={result}
              width="300"
              height="300"
              alt="an image of something"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
