const UniversityCard = ({ university }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{university.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-600">{university.country}</span>
          {university.alpha_two_code && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
              {university.alpha_two_code}
            </span>
          )}
        </div>

        {university['state-province'] && (
          <div className="text-gray-600 mb-3">
            <span className="font-medium">State/Province: </span>
            {university['state-province']}
          </div>
        )}

        {university.domains?.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-500 mb-1">Domains:</h4>
            <div className="flex flex-wrap gap-2">
              {university.domains.map((domain, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        )}

        {university.web_pages?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-1">Websites:</h4>
            <div className="space-y-1">
              {university.web_pages.map((web, index) => (
                <a
                  key={index}
                  href={web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 hover:underline text-sm truncate"
                >
                  {web.replace(/^https?:\/\//, '')}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityCard;