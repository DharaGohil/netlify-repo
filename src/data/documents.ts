export const categories = [
    { slug: 'technical-writing', label: 'Technical writing', description: 'API references, architecture, user guides, and operational documentation.' },
    { slug: 'docs-as-code', label: 'Docs-as-code & strategy', description: 'Content standards, contribution guidelines, and publishing workflows.' },
    { slug: 'knowledge-management', label: 'Knowledge management', description: 'Knowledge base structure, taxonomy, and content governance.' },
    { slug: 'ai-assisted-documentation', label: 'AI-assisted documentation', description: 'Prompt libraries, AI workflows, and human review practices.' },
    { slug: 'case-studies', label: 'Case studies', description: 'Documentation modernization and content migration approaches.' },
];
const files = import.meta.glob('../content/*/*', { query: '?raw', import: 'default', eager: true });
export const documents = Object.entries(files)
    .filter(([path, content]) => !/\.(md|pdf)$/.test(path) && String(content).trim())
    .map(([path, content]) => {
        const slug = path.split('/content/')[1];
        const title = String(content).split('\n').find(line => line.startsWith('# '))?.slice(2).trim();
        return { slug, title: title || slug.split('/')[1].replaceAll('-', ' ') };
    }).sort((a, b) => {
        if (a.slug.endsWith('/readme')) return -1;
        if (b.slug.endsWith('/readme')) return 1;
        return a.title.localeCompare(b.title);
    });
