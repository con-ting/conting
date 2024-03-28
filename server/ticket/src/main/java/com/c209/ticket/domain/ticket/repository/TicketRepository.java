package com.c209.ticket.domain.ticket.repository;


import com.c209.ticket.domain.ticket.dto.TicketDto;
import com.c209.ticket.domain.ticket.entity.Ticket;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TicketRepository extends ReactiveCrudRepository<Ticket, Long> {

    @Query("SELECT ticket_id, scchedule_id,'', row, col FROM ticket WHERE owner_id= :ownerId ")
    Flux<TicketDto> findAllByOwnerId(Long ownerId);

    @Query("SELECT ticket_id, scchedule_id,'', row, col FROM ticket WHERE ticket_id= :ticketId ")
    Mono<TicketDto> findByTicketDtoId(Long ticketId);

    Mono<Ticket> findByTicketId(Long ticketId);
}
