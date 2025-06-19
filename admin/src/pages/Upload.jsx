import UploadForm from '../components/UploadForm';

export default function Upload() {
  return (
    <div className="p-8 overflow-auto">
       <div className="w-full flex justify-center mb-3">
      <h1 className="text-2xl font-bold mb-6">Upload Media</h1>
      </div>
      <UploadForm />
    </div>
  );
}  