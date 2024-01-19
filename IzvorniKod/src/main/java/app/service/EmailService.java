package app.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void posaljiPotvrdu(String emailAdresa) throws MessagingException, jakarta.mail.MessagingException {
        jakarta.mail.internet.MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");

        helper.setTo(emailAdresa);
        helper.setSubject("Potvrda registracije");
        helper.setText("Hvala vam što ste se registrirali na našu aplikaciju.", true);

        javaMailSender.send(mimeMessage);
    }
}
