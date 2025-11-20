document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminal-body');
    const typingSpeed = 40;
    const lineDelay = 700;

    const asciiArt = `
 SSS   OOO   K  K
S      O   O  K K
 SSS   O   O  KK
    S  O   O  K K
 SSS   OOO   K  K
`;

    const commands = [
        {
            cmd: "seydina --help",
            output: `
<span class="section-title">AIDE DES COMMANDES 'seydina.exe'</span>

  Bienvenue sur mon portfolio terminal. Voici les commandes disponibles :

  <strong>--profil</strong>      Affiche une brève introduction.
  <strong>--skills</strong>      Liste mes compétences techniques.
  <strong>--projects</strong>    Présente mes projets majeurs.
  <strong>--tools</strong>         Énumère les outils et environnements que je maîtrise.
  <strong>--contact</strong>       Affiche mes informations de contact.
  <strong>--all</strong>           Exécute toutes les commandes ci-dessus.
  <strong>clear</strong>         Efface le terminal.
`
        },
        {
            cmd: "seydina --profil",
            output: `
<span class="section-title">PROFIL</span>

Passionné par la cybersécurité, le développement bas-niveau et la robotique. 
J'aime comprendre comment les systèmes fonctionnent, des registres du CPU jusqu'aux protocoles réseau.
`
        },
        {
            cmd: "seydina --skills",
            output: `
<span class="section-title">COMPÉTENCES TECHNIQUES</span>

  <strong>[Programmation & Bas-Niveau]</strong>
  <ul>
    <li>Assembleur x86_64 : registres, pile, sauts, appels système (GDB).</li>
    <li>C / C++ : pointeurs, structures, listes chaînées, allocation dynamique.</li>
    <li>Python : automatisation, Scapy (Ethernet/ARP/TCP), Tkinter.</li>
    <li>Bash : scripts, fonctions, rsync, cron (ex : PwnSync).</li>
  </ul>
  <strong>[Réseaux & Sécurité]</strong>
  <ul>
    <li>Matériel : MikroTik, Cisco, Ubiquiti (Hotspot, RADIUS, VPN WireGuard).</li>
    <li>Analyse : Nmap, Wireshark, tcpdump, ARP spoofing, MITM.</li>
  </ul>
  <strong>[Cryptographie & CTF]</strong>
  <ul>
    <li>Concepts : XOR, Base64, ROT13, Vigenère, hachages (MD5/SHA256).</li>
    <li>Plateformes : TryHackMe, Hack The Box, Pwn College.</li>
  </ul>
  <strong>[Électronique & Robotique]</strong>
  <ul>
    <li>Arduino / Wokwi : capteurs, afficheurs LCD, pilotage PWM, relais, MOSFET.</li>
    <li>Conception de logique temps réel et contrôle asservi.</li>
  </ul>
`
        },
        {
            cmd: "seydina --projects",
            output: `
<span class="section-title">PROJETS MAJEURS</span>

  <ul>
    <li><strong>PwnSync :</strong> Script Bash (rsync) pour synchronisation serveur↔local, avec démon.</li>
    <li><strong>Bootcamps Cybersécurité :</strong> Participation sur Linux, réseaux, crypto, web, assembleur.</li>
    <li><strong>Portail Captif MikroTik :</strong> Hotspot avec walled-garden et intégration API.</li>
    <li><strong>Robotique :</strong> Feu de signalisation, chapelet électronique, pilotage servomoteurs.</li>
    <li><strong>Équipe Nationale de Robotique (Mali) :</strong> Participation à 2 compétitions internationales.</li>
  </ul>
`
        },
        {
            cmd: "seydina --tools",
            output: `
<span class="section-title">OUTILS & ENVIRONNEMENTS</span>

  Kali/Debian Linux, MikroTik RouterOS, Wireshark, GDB, Scapy, Arduino IDE, VS Code, Git, TryHackMe, Pwn College.
`
        },
        {
            cmd: "seydina --contact",
            output: `
<span class="section-title">CONTACT</span>

  Vous pouvez me joindre via :

  <ul>
    <li><strong>Email :</strong> <a href="mailto:votre.email@example.com">votre.email@example.com</a></li>
    <li><strong>GitHub :</strong> <a href="https://github.com/votre-profil" target="_blank">github.com/votre-profil</a></li>
    <li><strong>LinkedIn :</strong> <a href="https://linkedin.com/in/votre-profil" target="_blank">linkedin.com/in/votre-profil</a></li>
  </ul>
`
        }
    ];

    let commandIndex = 0;

    function createPrompt(commandText = "") {
        const p = document.createElement('p');
        p.innerHTML = `<span class="prompt">C:\\Users\\Seydina></span> <span class="command">${commandText}</span>`;
        terminalBody.appendChild(p);
        scrollToBottom();
    }

    function typeCommand(command, callback) {
        let i = 0;
        const commandSpan = terminalBody.lastChild.querySelector('.command');
        const interval = setInterval(() => {
            commandSpan.textContent += command[i];
            i++;
            if (i === command.length) {
                clearInterval(interval);
                callback();
            }
        }, typingSpeed);
    }

    function showOutput(output, callback) {
        const p = document.createElement('p');
        p.className = 'output';
        p.innerHTML = output;
        terminalBody.appendChild(p);
        scrollToBottom();
        setTimeout(callback, lineDelay);
    }
    
    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function runSequence() {
        if (commandIndex >= commands.length) {
            createPrompt(); // Final empty prompt
            return;
        }

        const current = commands[commandIndex];
        createPrompt();
        
        typeCommand(current.cmd, () => {
            showOutput(current.output, () => {
                commandIndex++;
                runSequence();
            });
        });
    }

    // Start the sequence
    showOutput(asciiArt, () => {
        runSequence();
    });
});
