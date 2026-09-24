# Codi actualitzat per a Google Apps Script (Sense Nord)

Copia tot el codi d'aquest fitxer i enganxa'l al teu **Google Apps Script** (dins de *Extensions -> Apps Script* del teu Google Sheet):

```javascript
// Funció per autoritzar els permisos de correu a Google (Executa aquesta funció 1 vegada si cal)
function testSendEmail() {
  MailApp.sendEmail("guillemnaba@gmail.com", "Prova de permís", "Si reps aquest correu, els permisos estan 100% actius!");
  Logger.log("Correu de prova enviat amb èxit!");
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    result.push({
      timestamp: data[i][0] || '-',
      createdAt: data[i][0] || '-',
      event: data[i][1] || 'Via Ferrada Solidària',
      name: data[i][2] || '-',
      email: data[i][3] || '-',
      phone: data[i][4] || '-',
      comments: data[i][5] || '-',
      dni: data[i][6] || '-',
      level: data[i][7] || 'No especificat',
      emergencyContact: data[i][8] || '-',
      id: data[i][9] || ('SN-VF2026-' + (1000 + i))
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: result }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var raw = JSON.parse(e.postData.contents);
    var reg = raw.registration || raw.data || raw;
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. Guardar la fila al Google Sheet
    sheet.appendRow([
      reg.createdAt || new Date().toLocaleString('ca-ES'),
      reg.event || 'Via Ferrada Solidària',
      reg.name || '',
      reg.email || '',
      reg.phone || '',
      reg.comments || '',
      reg.dni || '',
      reg.level || '',
      reg.emergencyContact || '',
      reg.id || ''
    ]);

    var EL_TEU_CORREU = "guillemnaba@gmail.com"; 

    // 2. Correu al participant amb el text DINÀMIC segons l'esdeveniment
    if (reg.email && reg.email.indexOf('@') !== -1) {
      var clientSubject = "Confirmació d'Inscripció: " + (reg.event || "Sense Nord Solidari") + " (" + (reg.id || "") + ")";
      
      // Utilitzem el text específic generat per la web segons l'esdeveniment
      var clientBody = reg.instructions || ("Hola " + reg.name + "!\n\nGràcies per inscriure't a " + (reg.event || "l'esdeveniment Sense Nord") + "!\nCodi de reserva: " + reg.id);

      MailApp.sendEmail(reg.email, clientSubject, clientBody, {
        name: "Sense Nord Solidari"
      });
    }

    // 3. Correu de notificació a l'organitzador (a guillemnaba@gmail.com)
    var adminSubject = "🔔 Nova Inscripció (" + (reg.event || "Sense Nord") + "): " + reg.name + " (" + reg.id + ")";
    var adminBody = "S'ha rebut una nova inscripció a la web de Sense Nord:\n\n" +
      "• Esdeveniment: " + (reg.event || 'No indicat') + "\n" +
      "• Nom: " + reg.name + "\n" +
      "• Email: " + reg.email + "\n" +
      "• Telèfon: " + reg.phone + "\n" +
      "• DNI: " + reg.dni + "\n" +
      "• Opció / Nivell: " + reg.level + "\n" +
      "• Contacte d'emergència: " + reg.emergencyContact + "\n" +
      "• Comentaris: " + (reg.comments || 'Cap') + "\n" +
      "• Data: " + reg.createdAt;

    MailApp.sendEmail(EL_TEU_CORREU, adminSubject, adminBody);

  } catch(err) {
    Logger.log("Error: " + err.toString());
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```
