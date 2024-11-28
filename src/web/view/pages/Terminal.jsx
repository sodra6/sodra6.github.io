import { FitAddon } from "@xterm/addon-fit";
import React, { useEffect, useRef } from "react";
import { useXTerm } from "react-xtermjs";

function Terminal() {
  const { instance, ref } = useXTerm();
  const fitAddon = new FitAddon();

  const input = useRef("");
  const inputsArr = useRef([]);
  const xRef = useRef(0);
  const yRef = useRef(-1);

  const commandHandler = (input) => {
    switch (input.trim()) {
      case "help":
        print.command();
        break;
      case "info":
        print.myInfo();
        break;
      case "career":
        print.career();
        break;
      case "git":
        print.connect("git");
        window.open("https://www.github.com/sodra6", "_blank");
        break;
      case "blog":
        print.connect("blog");
        window.open("https://sodra6.tistory.com/", "_blank");
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
    connect : (method) => {
      instance?.writeln(`\r\n\x1b[35m Connecting ${method !== 'git' ? 'blog':'Git repository'}...\x1b[0m`);
    },
    command: () => {
      instance?.writeln("\r\n\x1b[32m 명령어 목록: ");
      instance?.writeln(
        "\x1b[33m\x1b[1m help \x1b[0m: 사용 가능한 명령어 목록을 제공합니다."
      );
      instance?.writeln(
        "\x1b[33m\x1b[1m info \x1b[0m: 개발자의 정보를 출력합니다."
      );
      instance?.writeln(
        "\x1b[33m\x1b[1m career \x1b[0m: 경력 기술서를 출력합니다."
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
    career : (delay) => {
      let index = 0;
      const text = `
        프로젝트 : 'AI기반 실시간 상수도 관망 사고감지 시스템 구축용역'\r\n
        참여기간 : 2021.08.16-2022.04.11\r\n
        개발환경 : Spring framework, jquery, Tibero, Tensorflow\r\n
        소속회사 : 마인드원\r\n
        고 객 사 : 한국수자원공사\r\n
        수행업무 : 
\r\n
        ----------------------------------------------------------------\r\n
\r\n
        프로젝트 : '상수도 생애주기(자산)관리 시스템'\r\n
        참여기간 : 2022.04.01-2023.01.01\r\n
        개발환경 : Spring boot, jquery, PostgreSQL, Tensorflow\r\n
        소속회사 : 마인드원\r\n
        고 객 사 : 한국환경공단\r\n
        수행업무 : 
\r\n
        ----------------------------------------------------------------\r\n
\r\n
        프로젝트 : '중앙 하수도 자산관리 시스템 구축'\r\n
        참여기간 : 2023.01.01-2023.07.14\r\n
        개발환경 : Spring boot, React, PostgreSQL\r\n
        소속회사 : 마인드원\r\n
        고 객 사 : 한국환경공단\r\n
        수행업무 : 
        \r\n
        ----------------------------------------------------------------\r\n
\r\n
        프로젝트 : 'Bizcare 3.0 운영'\r\n
        참여기간 : 2023.07.17-2024.11.03\r\n
        개발환경 : Spring framework, jquery, Ms-sql\r\n
        소속회사 : Biztech i\r\n
        고 객 사 : Biztech i\r\n
        수행업무 : 
\r\n
        ----------------------------------------------------------------\r\n
\r\n
        프로젝트 : 'LG CNS LG-NET팀 업무 자동화'\r\n
        참여기간 : 2023.11.06-2024.12.31\r\n
        개발환경 : Spring boot, React, MariaDB\r\n
        소속회사 : Biztech i\r\n
        고 객 사 : LG CNS\r\n
        수행업무 : 
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
        inputsArr.current.push(input.current.trim());
        yRef.current = inputsArr.current.length;

        input.current = ""; // 버퍼 초기화
        xRef.current = 0;
        instance?.write("\x1b[0m");
        instance?.write("\r\n");
        instance.write(" sodra6 $ ");
      } else {
        if (e.domEvent.key === "Backspace") {
          if (xRef.current > 0) {
            instance?.write("\x1B[1D"); //왼쪽으로 한칸
            instance?.write("\x1b[P"); //현재 커서만 삭제
            input.current = input.current.slice(0, -1);
            xRef.current -= 1;
          }
        } else if (e.domEvent.key === "Delete") {
          if (input.current.length > 0 && xRef.current < input.current.length) {
            instance?.write("\x1B[P"); //현재 커서만 삭제
            input.current = input.current.slice(0, xRef.current) + input.current.slice(xRef.current + 1)
            xRef.current = input.current.length - 1;
          }
        } else if (e.domEvent.key === "ArrowUp") {
          if(yRef.current > 0){
            yRef.current -= 1;
            input.current = inputsArr.current[yRef.current];
            xRef.current = input.current.length;
            instance?.write(input.current)
          }
        } else if (e.domEvent.key === "ArrowDown") {
          if (yRef.current < inputsArr.current.length - 1) {
            yRef.current += 1;
            input.current = inputsArr.current[yRef.current];
            xRef.current = input.current.length;
          } else {
            yRef.current = inputsArr.current.length;
            input.current = "";
            xRef.current = input.current.length;
          }
          instance?.write(input.current)
        } else if (e.domEvent.key === "ArrowLeft") {
          if (input.current.length > 0 && xRef.current > 0) {
            xRef.current -= 1;
            instance?.write("\x1b[D");
          }
        } else if (e.domEvent.key === "ArrowRight") {
          console.log(xRef.current)
          console.log(input.current.length)
          if (input.current.length > 0 && xRef.current < input.current.length-1) {
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
