import { FileCode, FilePlus, FileX, Folder } from 'lucide-react';
import { FileChange, OperationType } from '@/types/plan';

interface FilesAffectedProps {
  files: FileChange[];
}

const operationConfig: Record<OperationType, { label: string; className: string }> = {
  CREATE: { label: 'CREATE', className: 'bg-success/20 text-success border-success/30' },
  MODIFY: { label: 'MODIFY', className: 'bg-primary/20 text-primary border-primary/30' },
  DELETE: { label: 'DELETE', className: 'bg-destructive/20 text-destructive border-destructive/30' },
};

export function FilesAffected({ files }: FilesAffectedProps) {
  const getFileIcon = (operation: OperationType) => {
    switch (operation) {
      case 'CREATE':
        return FilePlus;
      case 'DELETE':
        return FileX;
      default:
        return FileCode;
    }
  };

  const getPathParts = (path: string) => {
    const parts = path.split('/');
    const fileName = parts.pop() || '';
    const directory = parts.join('/');
    return { directory, fileName };
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Folder className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Files Affected
        </h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {files.length}
        </span>
      </div>

      <div className="grid gap-3">
        {files.map((file, index) => {
          const FileIcon = getFileIcon(file.operation);
          const { directory, fileName } = getPathParts(file.path);
          const config = operationConfig[file.operation];

          return (
            <div
              key={file.id}
              className="glass-panel rounded-lg p-4 animate-fade-in hover:border-primary/30 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <FileIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm text-muted-foreground">
                        {directory}/
                      </span>
                      <span className="font-mono text-sm font-medium text-foreground">
                        {fileName}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {file.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded border ${config.className}`}
                >
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
