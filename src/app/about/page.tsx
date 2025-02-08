"use client";

import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export default function About() {
  return (
    <Box>
      {/* Nagłówek */}
      <Typography variant="h3" align="center" gutterBottom>
        O Nas
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        Witamy w firmie zajmującej się kompleksową obsługą wind i urządzeń
        dźwigowych.
      </Typography>

      {/* Sekcja Nasza Historia */}
      <Stack
        direction="column"
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Box width="100%" maxWidth={800}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Nasza Historia
              </Typography>
              <Typography variant="body1" paragraph>
                Jesteśmy firmą z wieloletnim doświadczeniem w branży dźwigowej.
                Zajmujemy się projektowaniem, produkcją, montażem oraz serwisem
                wind zarówno dla budynków mieszkalnych, jak i przemysłowych.
                Nasza firma działa na rynku od 1995 roku i od tego czasu
                zyskaliśmy zaufanie wielu klientów.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Sekcja Usługi */}
        <Box width="100%" maxWidth={800}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Nasze Usługi
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Projektowanie i produkcja wind" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Montaż wind i dźwigów w budynkach" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Serwis i konserwacja urządzeń dźwigowych" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Modernizacja istniejących systemów wind" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Sekcja Misja */}
        <Box width="100%" maxWidth={800}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Nasza Misja
              </Typography>
              <Typography variant="body1" paragraph>
                Naszą misją jest dostarczanie najnowocześniejszych technologii w
                zakresie urządzeń dźwigowych, zapewniając bezpieczeństwo,
                komfort i niezawodność. Naszym celem jest sprostanie wymaganiom
                nawet najbardziej wymagających klientów, oferując indywidualne
                rozwiązania dopasowane do potrzeb.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Sekcja Kontakt */}
        <Box width="100%" maxWidth={800}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Kontakt
              </Typography>
              <Typography variant="body1" paragraph>
                Chcesz dowiedzieć się więcej? Skontaktuj się z nami!
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Email: kontakt@firmawindy.pl" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telefon: +48 123 456 789" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Adres: ul. Przykładowa 1, 00-000 Warszawa" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
}
