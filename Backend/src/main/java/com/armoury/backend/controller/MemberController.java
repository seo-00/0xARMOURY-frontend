package com.armoury.backend.controller;

import com.armoury.backend.config.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;

    // 회원가입 페이지 출력 요청
    @GetMapping("/member/save")
    public String saveForm() {
        return "save";
    }

    @PostMapping("/member/save")
    public BaseResponse<String> save(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("MemberController.save");
        System.out.println("memberDTO = " + memberDTO);
        memberService.save(memberDTO);
        return new BaseResponse<>("logIn");
    }

    @GetMapping("/member/login")
    public BaseResponse<String> loginForm() {
        return new BaseResponse<>("login");
    }

    @PostMapping("/member/login")
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        if (loginResult != null) {
            // login 성공
            session.setAttribute("loginEmail", loginResult.getMemberEmail());
            return "main";
        } else {
            // login 실패
            return "login";
        }
    }

    @GetMapping("/member/")
    public String findAll(Model model) {
        List<MemberDTO> memberDTOList = memberService.findAll();
        // 어떠한 html로 가져갈 데이터가 있다면 model사용
        model.addAttribute("memberList", memberDTOList);
        return "list";
    }

    @GetMapping("/member/{id}")
    public String findById(@PathVariable Long id, Model model) {
        MemberDTO memberDTO = memberService.findById(id);
        model.addAttribute("member", memberDTO);
        return "detail";
    }

    @GetMapping("/member/update")
    public String updateForm(HttpSession session, Model model) {
        String myEmail = (String) session.getAttribute("loginEmail");
        MemberDTO memberDTO = memberService.updateForm(myEmail);
        model.addAttribute("updateMember", memberDTO);
        return "update";
    }

    @PostMapping("/member/update")
    public String update(@ModelAttribute MemberDTO memberDTO) {
        memberService.update(memberDTO);
        return "redirect:/member/" + memberDTO.getId();
    }

    @GetMapping("/member/delete/{id}")
    public String deleteById(@PathVariable Long id) {
        memberService.deleteById(id);
        return "redirect:/member/";
    }

    @GetMapping("/member/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }

    @PostMapping("/member/email-check")
    public @ResponseBody String emailCheck(@RequestParam("memberEmail") String memberEmail) {
        System.out.println("memberEmail = " + memberEmail);
        String checkResult = memberService.emailCheck(memberEmail);
        return checkResult;
//        if (checkResult != null) {
//            return "ok";
//        } else {
//            return "no";
//        }
    }

}









