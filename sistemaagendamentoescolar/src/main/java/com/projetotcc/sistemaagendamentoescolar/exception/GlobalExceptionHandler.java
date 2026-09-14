package com.projetotcc.sistemaagendamentoescolar.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<ApiErrorResponse> handleRegraNegocio(
            RegraNegocioException exception,
            HttpServletRequest request) {

        return criarResposta(
                HttpStatus.UNPROCESSABLE_ENTITY,
                "REGRA_NEGOCIO_VIOLADA",
                exception.getMessage(),
                request
        );
    }

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ApiErrorResponse> handleRecursoNaoEncontrado(
            RecursoNaoEncontradoException exception,
            HttpServletRequest request) {

        return criarResposta(
                HttpStatus.NOT_FOUND,
                "RECURSO_NAO_ENCONTRADO",
                exception.getMessage(),
                request
        );
    }

    @ExceptionHandler(DataIndisponivelException.class)
    public ResponseEntity<ApiErrorResponse> handleDataIndisponivel(
            DataIndisponivelException exception,
            HttpServletRequest request) {

        return criarResposta(
                HttpStatus.CONFLICT,
                "DATA_INDISPONIVEL",
                exception.getMessage(),
                request
        );
    }

    @ExceptionHandler(AcessoNegadoException.class)
    public ResponseEntity<ApiErrorResponse> handleAcessoNegado(
            AcessoNegadoException exception,
            HttpServletRequest request) {

        return criarResposta(
                HttpStatus.FORBIDDEN,
                "ACESSO_NEGADO",
                exception.getMessage(),
                request
        );
    }

    private ResponseEntity<ApiErrorResponse> criarResposta(
            HttpStatus status,
            String error,
            String message,
            HttpServletRequest request) {

        ApiErrorResponse response = new ApiErrorResponse(
                OffsetDateTime.now(ZoneOffset.UTC),
                status.value(),
                error,
                message,
                request.getRequestURI()
        );

        return ResponseEntity.status(status).body(response);
    }
}
