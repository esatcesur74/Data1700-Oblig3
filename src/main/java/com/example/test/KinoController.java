package com.example.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Comparator;
import java.util.List;

@RestController
public class KinoController {

    @Autowired
    private KinoBilletterRepository kinoBilletterRepository;

    @GetMapping("/hentListe")
    public List<KinoBilletter1> hentListe() {
        List<KinoBilletter1> billetter = kinoBilletterRepository.findAll();
        billetter.sort(Comparator.comparing(KinoBilletter1::getEtternavn)); //
        return billetter;
    }

    @PostMapping("/leggeTil")
    public KinoBilletter1 settInn(@RequestBody KinoBilletter1 kinoBillett) {
        return kinoBilletterRepository.save(kinoBillett);
    }

    @DeleteMapping("/slett")
    public void slett() {
        kinoBilletterRepository.deleteAll();
    }
}