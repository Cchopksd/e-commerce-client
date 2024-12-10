"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";

interface DraggableImageProps {
  image: string | File;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  removeImage: (index: number) => void;
}

export const DraggableImage = ({
  image,
  index,
  moveImage,
  removeImage,
}: DraggableImageProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const imageSrc =
    typeof image === "string" ? image : URL.createObjectURL(image);

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      className={`relative group transition-all duration-300 ${
        isDragging ? "scale-90 opacity-50" : "scale-100"
      } hover:shadow-lg w-full h-48`}>
      <Image
        src={imageSrc}
        alt={`Product image ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover rounded-xl shadow-sm"
      />
      <button
        onClick={() => removeImage(index)}
        aria-label={`Remove image ${index + 1}`}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all">
        <X size={14} />
      </button>
    </div>
  );
};
