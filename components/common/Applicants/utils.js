const getLevel = (level) => {
    if (typeof level === 'string') return level
  
    if (level >= 0 && level <= 2) return 'Básico'
    if (level >= 3 && level <= 4) return 'Conversacional'
    if (level >= 5) return 'Nativo'
  
    return 'N/A'
  }
  
  const parseLanguages = (languages) =>
    languages.map((lang) => ({ label: lang.label, level: getLevel(lang.level || lang.rating)  }))
  
  export default parseLanguages
  