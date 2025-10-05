import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Download, ExternalLink } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  description: string | null;
  url: string;
  type: string;
}

interface DocumentsProps {
  yearLevel: string;
}

export default function Documents({ yearLevel }: DocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const year = yearLevel.toUpperCase();

  useEffect(() => {
    fetchDocuments();
  }, [yearLevel]);

  const fetchDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .or(`year_level.eq.${year},year_level.is.null`)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDocuments(data);
    }
    setLoading(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'link':
        return ExternalLink;
      case 'video':
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'link':
        return 'Lien';
      case 'video':
        return 'Vidéo';
      case 'pdf':
        return 'PDF';
      default:
        return 'Document';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#006400] p-3 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Documents & Bibliothèque</h1>
        </div>
        <p className="text-gray-600">
          Ressources pédagogiques pour {year}
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun document disponible pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => {
            const Icon = getTypeIcon(doc.type);

            return (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-[#006400] bg-opacity-10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-[#006400]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {doc.title}
                        </h3>
                        <span className="px-2 py-1 bg-[#00A86B] text-white text-xs font-medium rounded">
                          {getTypeBadge(doc.type)}
                        </span>
                      </div>
                      {doc.description && (
                        <p className="text-gray-600 mb-3">
                          {doc.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#006400] hover:bg-[#005000] text-white rounded-lg transition whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Télécharger</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
