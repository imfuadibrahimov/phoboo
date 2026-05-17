import os

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix the first part (around line 4090)
content = content.replace(
    '                   <div className="space-y-8 pt-8 border-t border-white/5">',
    '                        </div>\n                     </div>\n                  </div>\n                </div>\n\n                <div className="space-y-8 pt-8 border-t border-white/5">'
)

# Fix the second part (around line 4141)
content = content.replace(
    '                 </div>\n               </motion.div>',
    '                  </div>\n               </motion.div>'
)

# Cleanup the marker
content = content.replace('{/* MARKER_REG */}', '')

with open('src/App.tsx', 'w') as f:
    f.write(content)
