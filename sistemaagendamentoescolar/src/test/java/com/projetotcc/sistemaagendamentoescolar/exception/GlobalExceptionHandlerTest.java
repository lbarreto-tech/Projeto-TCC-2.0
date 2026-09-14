package com.projetotcc.sistemaagendamentoescolar.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler handler;
    private HttpServletRequest request;

    @BeforeEach
    void setUp() {
        handler = new GlobalExceptionHandler();

        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.setRequestURI("/api/agendamentos");

        request = mockRequest;
    }

    @Test
    void deveTratarRegraNegocioException() {

        RegraNegocioException exception =
                new RegraNegocioException(
                        "Agendamentos são permitidos apenas aos sábados e domingos."
                );

        ResponseEntity<ApiErrorResponse> response =
                handler.handleRegraNegocio(exception, request);

        assertEquals(HttpStatus.UNPROCESSABLE_ENTITY, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(422, response.getBody().getStatus());
        assertEquals("REGRA_NEGOCIO_VIOLADA", response.getBody().getError());
        assertEquals(
                "Agendamentos são permitidos apenas aos sábados e domingos.",
                response.getBody().getMessage()
        );
        assertEquals("/api/agendamentos", response.getBody().getPath());
        assertNotNull(response.getBody().getTimestamp());
    }

    @Test
    void deveTratarRecursoNaoEncontradoException() {

        RecursoNaoEncontradoException exception =
                new RecursoNaoEncontradoException("Agendamento não encontrado.");

        ResponseEntity<ApiErrorResponse> response =
                handler.handleRecursoNaoEncontrado(exception, request);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(404, response.getBody().getStatus());
        assertEquals("RECURSO_NAO_ENCONTRADO", response.getBody().getError());
        assertEquals(
                "Agendamento não encontrado.",
                response.getBody().getMessage()
        );
        assertEquals("/api/agendamentos", response.getBody().getPath());
        assertNotNull(response.getBody().getTimestamp());
    }

    @Test
    void deveTratarDataIndisponivelException() {

        DataIndisponivelException exception =
                new DataIndisponivelException(
                        "A data selecionada já está indisponível."
                );

        ResponseEntity<ApiErrorResponse> response =
                handler.handleDataIndisponivel(exception, request);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(409, response.getBody().getStatus());
        assertEquals("DATA_INDISPONIVEL", response.getBody().getError());
        assertEquals(
                "A data selecionada já está indisponível.",
                response.getBody().getMessage()
        );
        assertEquals("/api/agendamentos", response.getBody().getPath());
        assertNotNull(response.getBody().getTimestamp());
    }

    @Test
    void deveTratarAcessoNegadoException() {

        AcessoNegadoException exception =
                new AcessoNegadoException(
                        "Usuário não possui permissão para realizar esta operação."
                );

        ResponseEntity<ApiErrorResponse> response =
                handler.handleAcessoNegado(exception, request);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(403, response.getBody().getStatus());
        assertEquals("ACESSO_NEGADO", response.getBody().getError());
        assertEquals(
                "Usuário não possui permissão para realizar esta operação.",
                response.getBody().getMessage()
        );
        assertEquals("/api/agendamentos", response.getBody().getPath());
        assertNotNull(response.getBody().getTimestamp());
    }
}