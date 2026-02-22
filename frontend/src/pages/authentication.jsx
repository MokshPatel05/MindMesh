import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      }
      if (formState === 1) {
        const result = await handleRegister(name, username, password);
        setUsername('');
        setMessage(result);
        setOpen(true);
        setError('');
        setFormState(0);
        setPassword('');
        setName('');
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Network error. Please try again.";
      setError(message);
    }
  };

  return (
    <Grid container component="main" sx={{ minHeight: '100vh' }}>
      {/* Left - Branding Panel */}
      <Grid
        item
        xs={false}
        sm={5}
        md={6}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #0e1942 50%, #0f172a 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-30%',
            right: '-20%',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 4 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            }}
          >
            <VideocamIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
            MindMesh
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 320 }}>
            Connect with anyone, anywhere. Crystal-clear video calls that bring people together.
          </Typography>
        </Box>
      </Grid>

      {/* Right - Form Panel */}
      <Grid
        item
        xs={12}
        sm={7}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(30, 41, 59, 0.4)',
          backdropFilter: 'blur(20px)',
          borderLeft: { sm: '1px solid rgba(255,255,255,0.06)' },
          py: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, px: 3 }}>
          {/* Tab Switcher */}
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              p: 0.5,
              mb: 3,
              borderRadius: 2,
              bgcolor: 'rgba(15, 23, 42, 0.5)',
            }}
          >
            <Button
              fullWidth
              variant={formState === 0 ? 'contained' : 'text'}
              onClick={() => setFormState(0)}
              sx={{
                py: 1.5,
                borderRadius: 1.5,
                color: formState === 0 ? 'white' : 'text.secondary',
              }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant={formState === 1 ? 'contained' : 'text'}
              onClick={() => setFormState(1)}
              sx={{
                py: 1.5,
                borderRadius: 1.5,
                color: formState === 1 ? 'white' : 'text.secondary',
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Box component="form" noValidate>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 0 }}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              autoFocus={formState === 0}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography sx={{ color: '#ef4444', mt: 1, fontSize: '0.875rem' }}>
                {error}
              </Typography>
            )}

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
              onClick={handleAuth}
            >
              {formState === 0 ? 'Sign In' : 'Create Account'}
            </Button>

            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              {formState === 0 ? "Don't have an account? " : 'Already have an account? '}
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => setFormState(formState === 0 ? 1 : 0)}
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {formState === 0 ? 'Sign up' : 'Sign in'}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            borderRadius: 2,
          },
        }}
      />
    </Grid>
  );
}
