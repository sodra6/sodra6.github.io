import { FitAddon } from "@xterm/addon-fit";
import React, { useEffect, useRef, useState } from "react";
import { useXTerm } from "react-xtermjs";

function Terminal() {
  const { instance, ref } = useXTerm();
  const fitAddon = new FitAddon();

  const input = useRef("");
  const xRef = useRef(0);
  const [inputsArr, setInputsArr] = useState([]);

  const commandHandler = (input) => {
    console.log(input);
    switch (input.trim()) {
      case "help":
        print.command();
        break;
      case "info":
        print.myInfo();
        break;
      case "git":
        window.open("https://www.github.com/sodra6", "_blank");
        break;
      case "exit":
        instance?.dispose();
        break;
      default:
        print.default();
        break;
    }
  };

  const print = {
    default: () => {
      instance?.write(
        "\r\n\x1b[33m 잘못된 명령어입니다. help 명령어에서 항목을 확인해 주세요"
      );
    },
    command: () => {
      instance?.writeln("\r\n\x1b[32m 명령어 목록: ");
      instance?.writeln(
        "\x1b[33m\x1b[1m help \x1b[0m: 사용 가능한 명령어 목록을 제공합니다."
      );
      instance?.writeln(
        "\x1b[33m\x1b[1m info \x1b[0m: 프로그램 제작자에 대한 정보를 출력합니다."
      );
      instance?.writeln(
        "\x1b[33m\x1b[1m blog \x1b[0m: 블로그로 이동합니다.(새창)"
      );
      instance?.writeln(
        "\x1b[33m\x1b[1m git \x1b[0m : git 홈으로 이동합니다.(새창)"
      );
      instance?.writeln("\x1b[33m\x1b[1m exit \x1b[0m: 터미널을 종료합니다.");
    },
    myInfo: (delay) => {
      let index = 0;
      const text = `
        name: 'yong gyu' | 'Cho',\r\n
        email: 'sodra6@naver.com',\r\n
        git: 'https://github.com/sodra6',\r\n
        keywords: ['Web Dev', 'Front-end', 'Back-end'],\r\n
        career : ['Mind-One cop/2021-2023', 'Biztech i/2023-ing'],\r\n
        technologies: {\r\n
            languages: ['Java', 'JavaScript', 'SQL', 'HTML', 'CSS','JSP'],\r\n
            web: [\r\n
                'React', 'jQuery',\r\n
                'Axios', 'Bootstrap', 'Materialize CSS',\r\n
                'Spring MVC',\r\n
                ],\r\n
            databases: [\r\n
                'PostgreSQL', 'MariaDB/MySQL'\r\n
                'ORACLE', 'MySQL', 'MS-SQL',\r\n
                ],\r\n
            devOps: ['Git', 'Gitlab CI', 'SVN'],\r\n
            clouds: ['AWS'],\r\n
            operatingSystems: ['Linux', 'Unix', 'Windows'],\r\n
            editors: ['VSCode', 'Intellij', 'eclipse'],\r\n
            Education: ['Kyung-in high school', 'Dankook University Bachelor of Public Administration']\r\n
        \r\n
sodra6 $ `;
      const intervalId = setInterval(() => {
        if (index === 0)
          instance?.writeln("\r\n\x1b[34m Displaying information...\x1b[0m");
        if (index < text.length) {
          instance?.write(text[index]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, delay);
    },
  };

  useEffect(() => {
    instance?.loadAddon(fitAddon);
    instance?.open(ref);
    fitAddon.fit();

    instance?.write("\r\n");
    instance?.write(" 안녕하세요! 방문해주셔서 감사합니다.");
    instance?.write("\r\n");
    instance?.write(
      "\r\n\x1b[33m 사용할 수 있는 명령어 확인을 위해 '\x1b[1mhelp\x1b[0m\x1b[33m' 를 입력해 주세요.\x1b[0m"
    );
    instance?.write("\r\n");
    instance?.write("\r\n");
    instance?.write(" sodra6 $ ");

    instance?.onKey((e) => {
      if (e.domEvent.key === "Enter") {
        commandHandler(input.current);
        setInputsArr(inputsArr.concat(input.current));
        input.current = ""; // 버퍼 초기화
        xRef.current = 0;
        instance?.write("\x1b[0m");
        instance?.write("\r\n");
        instance.write(" sodra6 $ ");
      } else {
        if (e.domEvent.key === "Backspace") {
          if (xRef.current > 0) {
            xRef.current -= 1;
            instance?.write("\x1B[1D"); //왼쪽으로 한칸
            instance?.write("\x1b[P"); //현재 커서만 삭제
          }
        } else if (e.domEvent.key === "Delete") {
          instance?.write("\x1B[1C"); //오른쪽으로 한칸
          instance?.write("\x1B[P"); //현재 커서만 삭제
        } else if (e.domEvent.key === "ArrowUp") {
          instance?.write("\x1b[A");
        } else if (e.domEvent.key === "ArrowDown") {
          instance?.write("\x1b[B");
        } else if (e.domEvent.key === "ArrowLeft") {
          if (xRef.current > 0) {
            xRef.current -= 1;
            instance?.write("\x1b[D");
          }
        } else if (e.domEvent.key === "ArrowRight") {
          if (xRef.current < 0) {
            xRef.current += 1;
            instance?.write("\x1b[C");
          }
        } else {
          instance?.write(e.key);
          input.current += e.key;
          xRef.current += 1;
        }
      }
      return () => {
        instance?.dispose();
      };
    });
  }, [instance]);

  return (
    <div
      className="terminal-container"
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
      }}
      ref={ref}
    />
  );
}

export default Terminal;
