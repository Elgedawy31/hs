export const getSenderName = (from) => {
  // console.log(from);
    const match = from.match(/^(?:"([^"]+?)"\s)?<?([^>]+?)>?$/);
    if (match) {
     return {
      name: match[1],
      email: match[2]
     }
    }
    return {
     name:"UNKNOWN",
     email:"UNKNOWN"
    };
  }

  export const parseRecipients=(args)=>{
    const arr=args.split(",").map(arg=> {
        arg=arg.trim();
        return getSenderName(arg);
    });
    return arr;
  }
  export const formatQuillContentForEmail = (content) => {
    // First, let's convert Quill alignment classes to inline styles BEFORE juice processes them
    let processedContent = content;
  
    // Convert alignment classes to inline styles
    const alignmentReplacements = {
      'ql-align-center': 'text-align: center',
      'ql-align-right': 'text-align: right',
      'ql-align-justify': 'text-align: justify'
    };
  
    // Process each alignment type
    Object.entries(alignmentReplacements).forEach(([className, style]) => {
      // Handle elements that only have alignment class
      const classOnlyRegex = new RegExp(`class="(${className})"`, 'g');
      processedContent = processedContent.replace(classOnlyRegex, `style="${style}"`);
  
      // Handle elements that have alignment class along with other classes
      const classWithOthersRegex = new RegExp(`class="([^"]*?)\\b${className}\\b([^"]*?)"`, 'g');
      processedContent = processedContent.replace(classWithOthersRegex, (match, prefix, suffix) => {
        const otherClasses = [prefix, suffix]
          .filter(Boolean)
          .join(' ')
          .trim();
        
        if (otherClasses) {
          return `class="${otherClasses}" style="${style}"`;
        } else {
          return `style="${style}"`;
        }
      });
  
      // Handle elements that already have some styles
      const styleRegex = new RegExp(`class="[^"]*?\\b${className}\\b[^"]*?"[^>]*?style="([^"]*?)"`, 'g');
      processedContent = processedContent.replace(styleRegex, (match, existingStyles) => {
        return match.replace(existingStyles, `${existingStyles}; ${style}`);
      });
    });
  
    // Base styles that will be inlined by juice
    const baseStyles = `
      <style>
        /* Text alignment */
        [style*="text-align: center"] {
          text-align: center !important;
          display: block !important;
        }
        [style*="text-align: right"] {
          text-align: right !important;
          display: block !important;
        }
        [style*="text-align: justify"] {
          text-align: justify !important;
          display: block !important;
        }
        
        /* Make sure block elements preserve alignment */
        p, div, h1, h2, h3, h4, h5, h6 {
          display: block !important;
          clear: both !important;
        }
        
        /* Font handling */
        .ql-size-small { font-size: 0.75em !important; }
        .ql-size-large { font-size: 1.5em !important; }
        .ql-size-huge { font-size: 2em !important; }
        
        /* Images in alignments */
        [style*="text-align: center"] img {
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
        }
        [style*="text-align: right"] img {
          margin-left: auto !important;
          margin-right: 0 !important;
          display: block !important;
        }
        
        /* General email styles */
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
        }
        
        img {
          max-width: 100% !important;
          height: auto !important;
        }
        
        /* Lists */
        ul, ol {
          padding-left: 40px !important;
        }
      </style>
    `;
  
    // Add mso conditionals for Outlook
    const outlookWrapper = `
      <!--[if mso]>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="mso-line-height-rule: exactly;">
      <![endif]-->
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 100%; min-width: 100%; width: 100%;">
          ${baseStyles}
          ${processedContent}
        </div>
      <!--[if mso]>
          </td>
        </tr>
      </table>
      <![endif]-->
    `;
  
    return outlookWrapper;
  };



  
  