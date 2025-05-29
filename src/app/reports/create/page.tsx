"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { resolve } from "path";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

type FormData = {
  title: string;
  description: string;
  category: string;
  location: {
    lat: number,
    lng: number,
    address: string,
  },
  mediaUrls: File | null;
};

const initialFormData: FormData = {
  title: "",
  description: "",
  category: "",
    location: {
    lat: 0,
    lng: 0,
    address: "",
  },
  mediaUrls: null,
};

const Map = dynamic(() => import("@/components/ReportMap"), { ssr: false });


export default function CreateReport() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const router = useRouter();

    // Fungsi untuk update lokasi dari map
  const handleMapClick = async (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, lat, lng },
    }));
    // Reverse geocoding
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          lat,
          lng,
          address: data.display_name || "",
        },
      }));
      setAddressError(null);
    } catch {
      setAddressError("Gagal mendapatkan alamat.");
    }
  };

  // Fungsi untuk update map dari address
  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, address },
    }));
    if (address.length > 5) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await res.json();
        if (data && data[0]) {
          setFormData((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
              address,
            },
          }));
          setAddressError(null);
        } else {
          setAddressError("Alamat tidak ditemukan.");
        }
      } catch {
        setAddressError("Gagal mencari alamat.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "mediaUrls" && files) {
      setFormData((prev) => ({
        ...prev,
        mediaUrls: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      let base64String: string | null = null;

      if (formData.mediaUrls) {
        const file = formData.mediaUrls;
        const reader = new FileReader();

        base64String = await new Promise((Resolve, reject) => {
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
      }

        const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        mediaUrls: base64String ? [base64String] : [],
        };

        const response = await fetch("/api/report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // biar kirim cookie
        body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Submit failed");

        setFormData(initialFormData);
        setTimeout(() => {
        router.push("/auth/login");
        }, 2000);
    } catch (error) {
        console.error("Submit Error:", error);
    } finally {
        setIsLoading(false);
    }
    };

  return (
    <div className="flex justify-center p-10 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-12 rounded-xl bg-white p-10 shadow-xl"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Laporkan Masalah</h2>
          <p className="mt-2 text-sm text-gray-600">
            Informasi ini akan ditampilkan secara publik. Harap tidak menyertakan informasi pribadi.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Judul */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Judul Laporan
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <div className="relative mt-1">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                >
                  <option value="" disabled>Pilih satu</option>
                  <option value="infrastruktur">Infrastruktur</option>
                  <option value="kebersihan">Kebersihan</option>
                  <option value="keamanan">Keamanan</option>
                  <option value="sosial">Sosial</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-2 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Upload Gambar */}
            <div className="sm:col-span-2">
              <label htmlFor="mediaUrls" className="block text-sm font-medium text-gray-700">
                Upload Foto
              </label>
              <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex justify-center text-sm text-gray-600">
                    <label
                      htmlFor="mediaUrls"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                    <span>
                    {formData.mediaUrls ? formData.mediaUrls.name : "Upload file"}
                    </span>
                        <input
                        id="mediaUrls"
                        name="mediaUrls"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFormData((prev) => ({
                            ...prev,
                            mediaUrls: file,
                            }));
                        }}
                        className="sr-only"
                        />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                </div>
              </div>
            </div>

            {/* Lokasi */}
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Lokasi (klik peta atau isi alamat)
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.location.address}
              onChange={handleAddressChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Masukkan alamat atau klik peta"
            />
            {addressError && (
              <p className="text-xs text-red-500">{addressError}</p>
            )}
            <div className="mt-4 h-64 w-full rounded-md overflow-hidden">
              <Map
                lat={formData.location.lat}
                lng={formData.location.lng}
                onMapClick={handleMapClick}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Koordinat: {formData.location.lat}, {formData.location.lng}
            </p>
          </div>

          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full bg-[#ec6f66] hover:bg-[#d85a51] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
              </>
            ) : (
              "Laporkan Sekarang"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
