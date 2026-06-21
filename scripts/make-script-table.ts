#!/usr/bin/env bun

import { markdownTable } from 'markdown-table';
import { parseArgs } from 'util';
import * as fs from 'fs';
import * as path from 'path';

interface ScriptMetadata {
  name: string;
  version: string;
  description: string;
}

function parseScriptHeader(content: string): ScriptMetadata | null {
  const headerMatch = content.match(/\/\/ ==UserScript==\n([\s\S]*?)\n\/\/ ==\/UserScript==/);
  if (!headerMatch) {
    return null;
  }

  const headerContent = headerMatch[1];
  const metadata: ScriptMetadata = {
    name: '',
    version: '',
    description: ''
  };

  // Extract @name
  const nameMatch = headerContent.match(/\/\/ @name\s+(.+)/);
  if (nameMatch) {
    metadata.name = nameMatch[1].trim();
  }

  // Extract @version
  const versionMatch = headerContent.match(/\/\/ @version\s+(.+)/);
  if (versionMatch) {
    metadata.version = versionMatch[1].trim();
  }

  // Extract @description
  const descriptionMatch = headerContent.match(/\/\/ @description\s+(.+)/);
  if (descriptionMatch) {
    metadata.description = descriptionMatch[1].trim();
  }

  return metadata.name ? metadata : null;
}

async function main() {
  // Parse command line arguments
  const { values } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      'src-dir': {
        type: 'string',
        default: './src',
      },
    },
  });
  const srcDir = values['src-dir'] as string;

  // Read directory
  const fullPath = path.resolve(srcDir);
  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.js'));

  // Parse each script file
  const scripts: ScriptMetadata[] = [];
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const metadata = parseScriptHeader(content);
    if (metadata) {
      scripts.push(metadata);
    }
  }

  // Output Markdown table
  const rows = scripts.map(s => [s.name, s.version, s.description]);
  console.log(markdownTable([
    ['Name', 'Version', 'Description'],
    ...rows,
  ]));
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
