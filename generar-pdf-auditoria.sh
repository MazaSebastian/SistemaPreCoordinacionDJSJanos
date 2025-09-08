#!/bin/bash

# Script para generar PDF de la auditoría del sistema Janos
# Requiere pandoc instalado

echo "🔍 Generando PDF de Auditoría del Sistema Janos..."

# Verificar si pandoc está instalado
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc no está instalado. Instalando..."
    
    # Detectar el sistema operativo
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install pandoc
        else
            echo "❌ Homebrew no está instalado. Instala pandoc manualmente:"
            echo "   https://pandoc.org/installing.html"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install pandoc
    else
        echo "❌ Sistema operativo no soportado. Instala pandoc manualmente:"
        echo "   https://pandoc.org/installing.html"
        exit 1
    fi
fi

# Generar PDF con pandoc
echo "📄 Generando PDF..."

pandoc AUDITORIA_SISTEMA_JANOS.md \
    -o "AUDITORIA_SISTEMA_JANOS.pdf" \
    --pdf-engine=wkhtmltopdf \
    --css=<(cat << 'EOF'
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #667eea;
            border-bottom: 3px solid #764ba2;
            padding-bottom: 10px;
        }
        h2 {
            color: #764ba2;
            margin-top: 30px;
        }
        h3 {
            color: #667eea;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #667eea;
            margin: 0;
            padding-left: 20px;
            color: #666;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #667eea;
            color: white;
        }
        .checklist {
            background-color: #f8f9ff;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
    EOF
    ) \
    --toc \
    --toc-depth=3 \
    --metadata title="Auditoría del Sistema Janos" \
    --metadata author="Sistema de Precoordinación DJ" \
    --metadata date="$(date '+%Y-%m-%d')"

# Verificar si se generó correctamente
if [ -f "AUDITORIA_SISTEMA_JANOS.pdf" ]; then
    echo "✅ PDF generado exitosamente: AUDITORIA_SISTEMA_JANOS.pdf"
    echo "📁 Ubicación: $(pwd)/AUDITORIA_SISTEMA_JANOS.pdf"
    
    # Abrir el PDF si es posible
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "AUDITORIA_SISTEMA_JANOS.pdf"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "AUDITORIA_SISTEMA_JANOS.pdf"
    fi
else
    echo "❌ Error al generar el PDF"
    exit 1
fi

echo "🎉 ¡Proceso completado!"
